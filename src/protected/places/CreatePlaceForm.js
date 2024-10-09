import React, {Component} from 'react'

import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

interface Props {
  closeCallback: () => void;
  submitCallback: (Event) => void;
}


class CreatePlaceForm extends Component<Props, {}> {

  formItemLayout = {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...this.formItemLayout} label="Title">
            {getFieldDecorator('title', {
              rules: [{required: true, message: 'Please fill this!',}],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...this.formItemLayout} label="Games">
            {getFieldDecorator('games', {
              rules: [{required: true, message: 'Please fill this!',}],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...this.formItemLayout} label="Invite People">
            {getFieldDecorator('people', {
              rules: [{required: true, message: 'Please fill this!',}],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...this.formItemLayout} label="Date">
            {getFieldDecorator('date', {
              rules: [{required: true, message: 'Please fill this!',}],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...this.formItemLayout} label="Place">
            {getFieldDecorator('place', {
              rules: [{required: true, message: 'Please fill this!',}],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...this.formItemLayout} label="description">
            <TextArea />
          </FormItem>
          <FormItem {...this.tailFormItemLayout} style={{float: 'right', paddingLeft: '12px'}}>
            <Button type="primary" htmlType="submit">Create</Button>
            <Button type="secondary" onClick={this.props.closeCallback}>Hide</Button>
          </FormItem>
        </Form>
      </div>
    )
  }

  handleSubmit = () => {
    //TODO: Upload to firebase
    this.props.submitCallback({
      title: "Test"
    })
    this.props.closeCallback()
  };
}

export default Form.create()(CreatePlaceForm)
