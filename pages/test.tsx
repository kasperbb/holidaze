import { Button, Container } from "@chakra-ui/react";
import { StarRatingInput } from "@components/Forms/Inputs/StarRatingInput";
import React from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  rating: string
}

export default function Test() {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      rating: "",
    },
    mode: "onChange"
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <Container py={40}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StarRatingInput name="rating" control={control} />

        <Button type="submit">Submit</Button>
      </form>
    </Container>
  )
}