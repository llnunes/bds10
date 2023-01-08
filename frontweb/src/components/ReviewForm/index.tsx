import './styles.css';
import { useForm } from 'react-hook-form';
import { requestBackend } from 'util/requests';

import { AxiosRequestConfig } from 'axios';
import { Review } from 'types/review';
import ButtonIcon from 'components/ButtonIcon';
import { useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
  movieId: string;
  onInsertReview: (review: Review) => void;
};

type FormData = {
  movieId: number;
  text: string;
};

const ReviewForm = ({ movieId, onInsertReview }: Props) => {
  const [hasError, setHasError] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    formData.movieId = parseInt(movieId);

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/reviews',
      data: formData,
      withCredentials: true,
    };

    requestBackend(config)
      .then((response) => {
        setHasError(false);
        setValue('text', '');
        onInsertReview(response.data);
        toast.info('Avaliação cadastrada com sucesso!');
      })
      .catch((error) => {
        setHasError(true);
        toast.error('Erro ao cadastrar avaliação!');
      });
  };

  return (
    <div className="base-card review-card">
      {hasError && (
        <div className="alert alert-danger">
          Erro ao tentar recuperar reviews
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            {...register('text', { required: 'Campo obrigatório' })}
            type="text"
            className={`form-control base-input ${
              errors.text ? 'is-invalid' : ''
            }`}
            placeholder="Deixe sua avaliação aqui"
            name="text"
          />
          <div className="invalid-feedback d-block">{errors.text?.message}</div>

          <div className="review-submit">            
              <ButtonIcon text="SALVAR AVALIAÇÃO" />            
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
