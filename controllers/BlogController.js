import Blog from "../models/Blog.js";
import fs from 'fs';

export const getBlogs = async (req, res) => {
  try {

    const isExist = await Blog.find();
    if (!isExist) return res.status(404).json({ status: 'error', data: 'blog not found' });

    return res.status(200).json({
      status: 'success',
      blogs: isExist
    });

  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
}

export const getBlog = async (req, res) => {
  try {

    const isExist = await Blog.findById(req.id);
    if (!isExist) return res.status(404).json({ status: 'error', data: 'blog not found' });

    return res.status(200).json({
      status: 'success',
      blog: isExist
    });

  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};


export const createBlog = async (req, res) => {
  const { title, content, slug, tags } = req.body ?? {};


  try {
    await Blog.create({
      title,
      content,
      slug,
      image: req.imagePath,
      tags,
    });
    return res.status(201).json({
      status: 'Success',
      data: 'Blog created successfully'
    });
  } catch (err) {

    fs.unlink(`./uploads/${req.imagePath}`, (error) => {
      return res.status(400).json({
        status: 'Error',
        message: err.message
      });
    })



  }

};



export const updateBlog = async (req, res) => {

  const { title, content, slug, tags } = req.body ?? {};

  try {
    const isExist = await Blog.findById(req.id);
    if (!isExist) {
      if (req.imagePath) {
        fs.unlinkSync(`./uploads/${req.imagePath}`);
        return res.status(404).json({ status: 'error', data: 'Blog not found' });
      } else {
        return res.status(404).json({ status: 'error', data: 'Blog not found' });
      }
    }


    isExist.title = title || isExist.title;
    isExist.content = content || isExist.content;
    isExist.slug = slug || isExist.slug;
    isExist.tags = tags || isExist.tags;
    await isExist.save();

    //updating file
    if (req.imagePath) {
      fs.unlink(`./uploads/${isExist.image}`, async (err) => {
        isExist.image = req.imagePath;
        await isExist.save();
        return res.status(200).json({
          status: 'success',
          data: 'Blog successfully updated'
        });

      })

    } else {

      return res.status(200).json({
        status: 'success',
        data: 'Blog successfully updated'
      });
    }



  } catch (err) {
    if (req.imagePath) {
      fs.unlink(`./uploads/${req.imagePath}`, (error) => {
        return res.status(500).json({
          status: 'error',
          message: err.message
        });
      })
    } else {
      return res.status(500).json({
        status: 'error',
        message: err.message
      });
    }

  }



}

export const deleteBlog = async (req, res) => {
  try {
    const isExist = await Blog.findById(req.id);
    if (!isExist) return res.status(404).json({ status: 'error', data: 'Blog not found' });


    fs.unlink(`./uploads/${isExist.image}`, async (err) => {

      await isExist.deleteOne();
      return res.status(200).json({ status: 'success', data: 'Blog deleted successfully' })
    })

  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message
    });

  }
};


