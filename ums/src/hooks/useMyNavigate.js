import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../models/auth/actions';


export const useMyNavigate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (newPage) => {
    dispatch(setCurrentPage(newPage));
    navigate(newPage);
  } ;
}