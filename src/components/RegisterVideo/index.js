import { StyledRegisterVideo } from "./style"
import React from "react"

function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues)
    
    return {
      values,
      handleChange: (e) => {
          const value = e.target.value;
          const name = e.target.name;
          setValues({
            ...values,
          [name]: value,
          })
        },
      clearForm() {
        setValues({});
      }
      }
    };

export default function RegisterVideo() {
  const formCadastro = useForm({
    initialValues: { título: "HTML", url: "www.youtube.com" },
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
          setFormVisivel(false)
          formCadastro.clearForm();
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
