import Swal from 'sweetalert2';

// eslint-disable-next-line import/prefer-default-export
export const showErrorAlert = (errorMessage) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: errorMessage,
    showConfirmButton: true,
  });
};