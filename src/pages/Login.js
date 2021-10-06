import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 600px;
  margin: 30px auto;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`;

const Component = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const validateUsername = (rule, value)=>{
    //  RegExp.test()
    if(/\W/.test(value)) return Promise.reject('只能是字母数字下划线');
    if(value.length < 4 || value.length > 10) return Promise.reject('长度为4~10个字符');
    return Promise.resolve();
  }

  return (
    <Wrapper>
      <Title>登录</Title>
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: '请输入您的用户名',
            },
            {
              validator: validateUsername,
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: '请输入您的密码',
            },
            {
              min: 4,
              message: '密码最少需要4个字符',
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default Component;