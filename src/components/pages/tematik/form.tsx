"use client";
import React, { useState } from "react";
import TextInput from "@/components/common/text-input/input";
import { Button } from "@/components/common/button/button";
import Swal from "sweetalert2";
import { withFormik, FormikProps, FormikBag } from "formik";
import * as Yup from "yup";
import { fetchApi } from "@/app/api/request";
import { CommonModal } from "@/components/common/common-modal/modal";

interface FormValues {
  namaTagging: string;
}

interface OtherProps {
  title?: string;
  ref?: any;
  handleCancel?: any;
}

interface MyFormProps extends OtherProps {
  handleSubmit: (
    values: FormValues,
    formikBag: FormikBag<object, FormValues>,
  ) => void;
  handleCancel: () => void;
}

const FormField = (props: OtherProps & FormikProps<FormValues>) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    handleCancel,
    isSubmitting,
    ref,
  } = props;
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <React.Fragment>
      <div className="form-container bg-white rounded-lg">
        <div className="w-full py-3 bg-meta-6 font-bold text-center text-white uppercase">
          Form Tambah Tagging
        </div>
        <form className="form-wrapper-general relative p-6">
          <div className="data flex flex-row w-full">
            <TextInput
              type="text"
              id="namaTagging"
              name="namaTagging"
              touched={touched.namaTagging}
              label="Masukkan Tagging"
              change={handleChange}
              value={values.namaTagging}
              errors={errors.namaTagging}
            />
          </div>
          <div className="btn-submit mx-8 pb-4 mt-4 space-x-3 absolute right-0 flex">
            <div className="w-[8em]">
              <Button
                variant="xl"
                className="button-container mb-2 mt-5"
                rounded
                onClick={handleSubmit}
              >
                <div className="flex justify-center items-center text-white font-Nunito">
                  <span className="button-text">Tambah</span>
                </div>
              </Button>
            </div>
          </div>
        </form>
        <div className="w-[8em]">
          <Button
            variant="xl"
            type="secondary"
            className="button-container mb-2 mt-3 ml-6"
            rounded
            onClick={handleCancel}
          >
            <div className="flex justify-center items-center text-[#002DBB] font-Nunito">
              <span className="button-text">Batal</span>
            </div>
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

function CreateForm({ handleSubmit, handleCancel }: MyFormProps) {
  const FormWithFormik = withFormik({
    mapPropsToValues: () => ({
      namaTagging: "",
    }),
    validationSchema: Yup.object().shape({
      namaTagging: Yup.string().required("Tagging tidak boleh kosong !"),
    }),
    handleSubmit,
  })(FormField);

  return <FormWithFormik />;
}

interface PropTypes {
  profile: any;
  openAdd: boolean;
  setOpenAdd?: any;
}

const TematikForm = ({ profile, openAdd, setOpenAdd }: PropTypes) => {
  const handleSubmit = async (values: FormValues) => {
    const payload = {
      nama_tagging: values.namaTagging,
      kode_opd: profile.Perangkat_Daerah.kode_opd,
    };

    const response = await fetchApi({
      url: `/tagging/addTagging`,
      method: "post",
      body: payload,
      type: "auth",
    });

    if (!response.success) {
      if (response.data.code == 500) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Koneksi bermasalah!",
        });
      }
    } else {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data tagging berhasil tersimpan",
        showConfirmButton: false,
        timer: 1500,
      });
      setOpenAdd(false);
    }
  };

  const handleCancel = () => setOpenAdd(false);

  return (
    <CommonModal isOpen={openAdd} onClose={setOpenAdd}>
      <CreateForm handleSubmit={handleSubmit} handleCancel={handleCancel} />
    </CommonModal>
  );
};

export default TematikForm;
