import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddEvents = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [imageURL, setImageURL] = useState(null);

  const onSubmit = (data) => {
    const eventData = {
      name: data.name,
      image: imageURL,
    };
    const url = `http://localhost:5000/addEvent`;

    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(eventData),
    }).then((response) => {
      console.log("data send",response);
    });
  };

  const handleImageUpload = (event) => {
    console.log(event.target.files[0]);

    const imageUpload = new FormData();
    imageUpload.set("key", "b278a2d4e17062aed0996c67bedbf6d1");
    imageUpload.append("image", event.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageUpload)
      .then(function (response) {
        setImageURL(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Add your awesome Event here</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="name" defaultValue="New exciting event" ref={register} />
        <br />
        <input
          name="exampleRequired"
          type="file"
          onChange={handleImageUpload}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default AddEvents;
