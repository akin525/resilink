import React from "react";
import { FaCloudUploadAlt, FaEdit, FaTrash } from "react-icons/fa";
import { UploadProps } from "../../../types/Interface";

export const CustomUpload: React.FC<UploadProps> = ({
  handleFileChange,
  label,
  images,
  handleClick,
  inputRef,
  handleEdit,
  handleRemove,
}) => {
  return (
    <>
      <section className="mb-2 flex items-center w-full flex-col">
        <div className="w-full">
          {label && <label className="text-neutral-400 text-sm font-semibold mb-2">{label} </label>}
          {images.length < 6 && (
            <div className="mx-auto mb-10 p-32 border-2 border-dashed border-[#eee] rounded-md bg-gray-100 h-46 relative cursor-pointer text-center" onClick={handleClick}>
              <div className="flex justify-center items-center">
                <i className="text-4xl text-[#a59f9f]">
                  <FaCloudUploadAlt />
                </i>
              </div>
              <h6>Drag & Drop file here or click to upload</h6>
              <input
                style={{ display: "none" }}
                ref={inputRef}
                type="file"
                name="image"
                onChange={handleFileChange}
                className="form-control shadow-none"
                accept="image/*"
                multiple
              />
            </div>
          )}
          {images[0]?.preview && (
            <div className="grid grid-cols-3 gap-2">
              {images.map((img: any, index: number) => (
                <div key={index} onClick={handleClick} className="relative w-full">
                  <img src={img.preview} className="object-cover w-full h-full rounded-lg" alt={`property-img-${index}`} />
                  <div className="absolute inset-0 flex justify-center bg-black text-2xl gap-5 opacity-50 rounded-lg">
                    <button type="button" onClick={() => handleEdit(index)} className="relative z-20 text-blue-500">
                      <FaEdit />
                    </button>
                    <button type="button" onClick={() => handleRemove(index)} className="relative z-20 text-red-500">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
