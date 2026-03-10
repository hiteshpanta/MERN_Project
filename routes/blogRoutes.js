import express from 'express';
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from '../controllers/BlogController.js';
import { notAllowed } from '../utils/notAllowed.js';
import { checkFile, updateCheckFile } from '../middlewares/checkFile.js';
import { checkId } from '../middlewares/checkId.js';
import { checkAdmin, checkUser } from '../middlewares/checkUser.js';


const router = express.Router();




// router.route('/api/top-5').get(getTop5Products).all(notAllowed);

// router.route('/api/products/reviews/:id').post(checkId, checkUser, addReview).get(checkId, getProductReviews).all(notAllowed);
router.route('/api/blogs')
  .get(getBlogs)
  .post(checkUser, checkAdmin, checkFile, createBlog).all(notAllowed);

router.route('/api/blogs/:id')
  .get(checkId, getBlog)
  .patch(checkId, updateCheckFile, updateBlog)
  .delete(checkId, deleteBlog).all(notAllowed);



export default router;


