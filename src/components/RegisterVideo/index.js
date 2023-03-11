import { StyledRegisterVideo } from "./style"
import React from "react"
import { createClient } from '@supabase/supabase-js'

function getThumbnail(url) {
  return `
  https://img.youtube.com/vi/${url.split("v=")[1]}
  `
}

function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues)
    
    return {
      values,
      handleChange: (e) => {
          const value = e.target.value;
          const name = e.target.name;
          setValues({
            ...value,
          [name]: value,
          })
        },
      clearForm() {
        setValues({});
      }
      }
    };

const URL_PROJECT = "https://edojnbhwwtvqpicwfrqq.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkb2puYmh3d3R2cXBpY3dmcnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg1NTU3MTcsImV4cCI6MTk5NDEzMTcxN30.16HuTDUq-Y2GsDpFRtB72GmCat-lEV1WBbzHro4NYvI";

const supabase = createClient(
      URL_PROJECT,
      PUBLIC_KEY
    );


export default function RegisterVideo() {
  const formCadastro = useForm({
    initialValues: {
      título: "",
      url: "",
    }
    
  })
  const [formVisivel, setFormVisivel] = React.useState(true)
  
  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>
      {formVisivel ? (
        <form onSubmit={(e) => {
          e.preventDefault();

          setFormVisivel(false);

          formCadastro.clearForm();

          supabase
            .from("video")
            .insert({
              title: formCadastro.values.título,
              url: formCadastro.values.url,
              thumb: getThumbnail(formCadastro.values.url),
              playlist: "HTML & CSS"
            })

        }}>
          <div>
            <button
              type="button"
              className="close-modal"
              onClick={() => setFormVisivel(false)}
            >
              x
            </button>
            <input
              placeholder="Título do vídeo"
              name="título"
              value={formCadastro.values.título}
              onChange={formCadastro.handleChange}
            />
            <input
              placeholder="URL"
              name="url"
              value={formCadastro.values.url}
              onChange={formCadastro.handleChange}
            />

            <button type="submit">Cadastrar</button>
          </div>
        </form>
      ) : null}
    </StyledRegisterVideo>
  )
}
