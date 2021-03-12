import React, { useState } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Typography } from 'antd';
import Axios from "axios";
const { Title } = Typography;

function Verification(props) {
    const [formErrorMessage, setFormErrorMessage] = useState('')
    return (
        <Formik
            initialValues={{
                otp: '',
            }}
            validationSchema={Yup.object().shape({
                otp: Yup.string()
                    .required('otp is required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    let dataToSubmit = {
                        otp: values.otp,
                        sessionId: props.location.state.sessionId
                    };
                    console.log(dataToSubmit)
                    Axios.post("/api/users/verification", dataToSubmit).then((response) => {
                        if (response.data.status) {
                            window.sessionStorage.setItem('id', props.location.state.id);
                            window.location.replace("/home");
                        } else {
                            setFormErrorMessage('Invalid otp')
                        }
                    })
                        .catch(err => {
                            setFormErrorMessage('Invalid otp')
                            setTimeout(() => {
                                setFormErrorMessage("")
                            }, 3000);
                        });
                    setSubmitting(false);
                }, 500);
            }}
        >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                } = props;
                return (
                    <div className="register">

                        <Title level={2}>Verification</Title>
                        <form onSubmit={handleSubmit} style={{ width: '350px' }}>

                            <Form.Item required>
                                <Input
                                    id="otp"
                                    placeholder="Enter your otp"
                                    type="number"
                                    value={values.otp}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.otp && touched.otp ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.otp && touched.otp && (
                                    <div className="input-feedback">{errors.otp}</div>
                                )}
                            </Form.Item>

                            {formErrorMessage && (
                                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
                            )}

                            <Form.Item>
                                <div>
                                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                                        Verify
                </Button>
                                </div>
                            </Form.Item>
                        </form>
                    </div>
                );
            }}
        </Formik>
    );
};

export default Verification;
