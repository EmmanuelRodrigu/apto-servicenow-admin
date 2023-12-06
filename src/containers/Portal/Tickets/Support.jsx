import React, { useState, useEffect, useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch, Controller } from "react-hook-form";
import { Button } from 'react-bootstrap';
import Select from "react-select";
import * as yup from "yup";
import Error from "@components/Error";
import { Link } from "react-router-dom";
import notify from "@utils/notify";
import { http } from "@providers/http";
import { useNavigate, useParams } from "react-router-dom";
import WysiwygEditor from "@components/TextEditor";
import { EditorState, convertToRaw } from 'draft-js';

export default function Support() {
  const inputFileRef = useRef(null);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sendEmail, setSendEmail] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const navigate = useNavigate();
  const { clientId } = useParams();
  const allowedFiles = ['.png', '.jpg', '.jpeg', '.pdf', '.xls', '.xlsx', '.doc', '.docx'];
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const schema = yup
    .object({
      files: yup.mixed().required('Debe adjuntar almenos 1 archivo'),
      summary: yup.string().required("El campo titulo de requerido"),
      type_request: yup.string(),
      reporter: yup.string().required("Se debe seleccionar una opcion"),
    })
    .required();

  const {
    setValue,
    control,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      files: [],
      summary: "",
      type_request: "SUPPORTREQUEST",
      reporter: "",
    },
  });

  const files = useWatch({
    control,
    name: 'files',
});

  const isFileAllowed = (fileName) => {
    let isFileAllowed = false;
    const regex = /(?:\.([^.]+))?$/;
    const extension = regex.exec(fileName);
    if (extension !== undefined && extension !== null) {
      for (const ext of allowedFiles) {
        if (ext === extension[0]) {
          isFileAllowed = true;
        }
      }
    }
    return isFileAllowed;
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
  };
  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };
  const handleDrop = (event) => {
    event.preventDefault();
    let filesInDrop = [...event.dataTransfer.files];
    let filesAccept = [];
    filesInDrop.forEach((element) => {
      if (isFileAllowed(element.name) == true) {
        filesAccept.push(element);
      }
    });
    setValue("files", [...files, ...filesAccept]);
    clearErrors("files");
  };

  function niceBytes(x) {
    let l = 0,
      n = parseInt(x, 10) || 0;

    while (n >= 1024 && ++l) {
      n = n / 1024;
    }

    return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
  }

  const onSubmit = async (values) => {
    setLoading(true);
    const content = convertToRaw(editorState.getCurrentContent());
    const data = {
      ...values,
      description: content.blocks,
      email: sendEmail,
    };
    console.log(content)
    await http.post(`api/requests/create/${clientId}`, data)
        .then((response) => {
            if(response.status < 400) {
                notify('Error al crear solicitud', 'error')
            } else {
                notify('Solicitud creada exitosamente', 'success');
                navigate(`/${clientId}/home`)
            }
        })
        .catch((error) => {
            notify(error, 'error');
        });
  };

  const getData = async () => {
    await http
      .get("api/users/jira")
      .then((response) => {
        setOptions(response);
      })
      .catch((error) => {
        notify(error, "error");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-20">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pl-40 pr-40 pb-10 rounded-3xl shadow-xl shadow-gray-400 section-form space-y-4">
          <h1 className="text-2xl pt-10 pb-10">Soporte tecnico</h1>
          <div className="pt-2 grid">
            <label className="text-lg">Titulo*</label>
            <div className="shadow-sm shadow-violet-400 rounded-lg">
              <input
                type="text"
                className={`input-form ${errors.summary ? "error" : ""}`}
                {...register("summary")}
              />
            </div>
            <Error error={errors?.summary} />
          </div>
          <div className="pt-2 grid">
            <label className="text-lg">Descripcion*</label>
            <div className="shadow-sm shadow-violet-400 rounded-lg editor">
              <WysiwygEditor 
                 editorState={editorState}
                 onEditorStateChange={setEditorState}
              />
              {/* <textarea
                                className="w-full"
                                rows={10}
                                { ...register('description') }
                            /> */}
            </div>
            <Error error={errors?.description} />
          </div>
          <div className="col-span-full pt-2">
            <div
              className="content-uploads cursor-pointer align-items-center flex justify-center"
              onDragOver={(event) => handleDragOver(event)}
              onDragEnter={(event) => handleDragEnter(event)}
              onDrop={(event) => handleDrop(event)}
              onClick={() => {
                inputFileRef.current.click();
              }}
            >
              <p className="pt-16 text-lg">Agregar archivos</p>
            </div>
            {files.map((item, index) => (
              <div
                className="form-titles mb-2 fs-14"
                key={`doc-${item.name}-${index}`}
              >
                {item.name} - {niceBytes(item.size)}{" "}
                <Button
                  variant="outline-danger"
                  className="me-3"
                  size="sm"
                  onClick={() => {
                    const list = files;
                    delete list[index];
                    setValue("files", list.filter(Boolean));
                  }}
                >
                  <svg
                    width="14"
                    height="18"
                    viewBox="0 0 14 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V6C13 4.9 12.1 4 11 4H3C1.9 4 1 4.9 1 6V16ZM13 1H10.5L9.79 0.29C9.61 0.11 9.35 0 9.09 0H4.91C4.65 0 4.39 0.11 4.21 0.29L3.5 1H1C0.45 1 0 1.45 0 2C0 2.55 0.45 3 1 3H13C13.55 3 14 2.55 14 2C14 1.45 13.55 1 13 1Z"
                      fill="#000000"
                    />
                  </svg>
                </Button>
              </div>
            ))}
            <Controller
              name="files"
              control={control}
              render={() => (
                <input
                  name="files"
                  multiple
                  type="file"
                  accept={allowedFiles.join()}
                  className="d-none"
                  ref={inputFileRef}
                  onChange={(evt) => {
                    const f = evt.target.files;
                    setValue("files", [...files, ...f]);
                    clearErrors("files");
                  }}
                />
              )}
            />
            <Error error={errors?.files}></Error>
          </div>
          <div className="pt-2">
            <label className="text-lg">Asignar a</label>
            <Select
              placeholder="Selecciona una opcion"
              className="block w-1/2 select"
              options={options}
              isClearable={true}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: "inherit",
                }),
              }}
              onChange={(option) => {
                if (option !== null) {
                  setValue("reporter", option.value);
                  setSendEmail(option.email);
                  clearErrors("reporter");
                } else {
                  setValue("reporter", "");
                }
              }}
            />
            <Error error={errors?.assignee} />
          </div>
          <div className="flex pt-10">
            <div className="pr-4">
              <button type="submit" className="btn-primary">
                Crear
              </button>
            </div>
            <Link to={`/${clientId}/home`} className="btn-cancel">
              Regresar
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
