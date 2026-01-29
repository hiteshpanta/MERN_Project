import { Formik } from "formik";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Spinner } from "../../components/ui/spinner";
import toast from "react-hot-toast";
import { useAddReviewMutation } from "../products/productApi.js";

export default function ReviewForm({ user, id }) {
  const [createReview, { isLoading }] = useAddReviewMutation();
  return (
    <div>

      <h1 className="mb-3">Add Review</h1>

      <Formik
        initialValues={{
          comment: '',
          rating: ''

        }}

        onSubmit={async (val) => {
          try {

            await createReview({
              id,
              token: user.token,
              body: {
                comment: val.comment,
                rating: Number(val.rating)
              }
            }).unwrap();

            toast.success('Review added successfully');

          } catch (err) {
            toast.error(err.data.message);

          }
        }}
      >
        {({ handleChange, setFieldValue, values, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="space-y-3 max-w-lg">
            <Textarea
              onChange={handleChange}
              name='comment'
              placeholder="Write your review here"
            />
            <Select
              name="rating"
              onValueChange={(value) => setFieldValue('rating', value)}
            >
              <SelectTrigger
                className="w-full">
                <SelectValue placeholder="Select experience " />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">Bad</SelectItem>
                  <SelectItem value="2">Satisfy</SelectItem>
                  <SelectItem value="3">Good</SelectItem>
                  <SelectItem value="4">Very Good</SelectItem>
                  <SelectItem value="5">Excellent</SelectItem>
                </SelectGroup>
              </SelectContent>

            </Select>
            <Button disabled={isLoading} type="submit">
              {isLoading && <Spinner />}
              Submit</Button>
          </form>
        )}
      </Formik>

    </div>
  )
}
