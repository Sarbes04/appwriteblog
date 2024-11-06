import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

//control RTE component se states utha ke form mein lekar jata hai
export default function RTE({name, control, label, defaultValue=""}) {
  return (
      <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
        <Controller
        name={name || "content"} //name hai to theek hai warna "content" dedo naam mein
        control={control} //control hume parent element dega
        //agar is field mein koi bhi change hota hai to mujhe inform kardena render ke sath 
        render={({field: {onChange}}) => (
            <Editor
            apiKey='5etlz73ppywrjddkeif190ek4l8894pc3kj3jtxyyb00qfw8'
            initialValue={defaultValue}
            init={{
                initialValue: defaultValue,
                height: 500,
                menubar: true,
                plugins: [
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                    "anchor",
                ],
                toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            //editor mein kuch bhi changes aayein onchange call ho jayeg a
            onEditorChange={onChange}
            />
        )}
        />
      </div>
  )
}
