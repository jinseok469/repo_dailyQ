import Swal from "sweetalert2";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Notfound = () =>{
  const nav = useNavigate();

   useEffect(() => {
    Swal.fire({
      icon: 'error',
      title: '오류 발생!',
      text: '잘못된 접근입니다!',
      confirmButtonText: '확인',
      confirmButtonColor: '#00664F'
    }).then((result) => {
      if (result.isConfirmed) {
        nav("/home", { replace: true });
      }
    });
  }, []);
  return(
    <div>

      
    </div>
  )
}
export default Notfound;