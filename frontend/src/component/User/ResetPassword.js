import React, { useEffect, useState } from 'react';
import "./ResetPassword.css";
import { SlLockOpen } from "react-icons/sl";
import { SlLock } from "react-icons/sl";
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../../actions/userAction';
import { toast } from 'react-toastify';

const ResetPassword = () => {

    const { token } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, success, loading } = useSelector(
        (state) => state.forgotPassword
      );

      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");

      const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
    
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
    
        dispatch(resetPassword(token, myForm));
      };

      useEffect(() => {
        if (error) {
          toast.error(error);
          dispatch(clearErrors());
        }
    
        if (success) {
          toast.success("Password Updated Successfully");
    
          navigate("/login");
        }
      }, [dispatch, error, navigate, success]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
    <>
    <MetaData heading="Change Password" />
    <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Change <span>Password</span></h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <SlLockOpen />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <SlLock />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
      
    </>
    )}
    </>
  );
}

export default ResetPassword;
