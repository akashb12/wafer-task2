import React, { useState } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Typography } from 'antd';
import Axios from "axios";
const { Title } = Typography;

function LoginPage(props) {
    const id = window.sessionStorage.getItem('id') || '';
    if (id) {
        props.history.push('/home')
    }
    const [formErrorMessage, setFormErrorMessage] = useState('')

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email('Email is invalid')
                    .required('Email is required'),
                password: Yup.string()
                    .min(6, 'Password must be at least 6 characters')
                    .required('Password is required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    let dataToSubmit = {
                        email: values.email,
                        password: values.password
                    };
                    Axios.post("/api/users/loginUser", dataToSubmit).then((response) => {
                        if (response.data.status) {
                            props.history.push({
                                pathname: '/verifyUser',
                                state: { sessionId: response.data.sessionId, id: response.data.id }
                            })
                        } else {
                            setFormErrorMessage('Check out your Account or Password again')
                        }
                    })
                        .catch(err => {
                            setFormErrorMessage('Check out your Account or Password again')
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

                        <Title level={2}>Log In</Title>
                        <form onSubmit={handleSubmit} style={{ width: '350px' }}>

                            <Form.Item required>
                                <Input
                                    id="email"
                                    placeholder="Enter your email"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.email && touched.email ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.email && touched.email && (
                                    <div className="input-feedback">{errors.email}</div>
                                )}
                            </Form.Item>

                            <Form.Item required>
                                <Input
                                    id="password"
                                    placeholder="Enter your password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.password && touched.password ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.password && touched.password && (
                                    <div className="input-feedback">{errors.password}</div>
                                )}
                            </Form.Item>

                            {formErrorMessage && (
                                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
                            )}

                            <Form.Item>
                                <div>
                                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                                        Log in
                </Button>
                                </div>
                Or <a href="/register">register now!</a>
                            </Form.Item>
                        </form>
                    </div>
                );
            }}
        </Formik>
    );
};

export default LoginPage;
