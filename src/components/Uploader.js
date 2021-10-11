import React,{useRef} from 'react';
import {useStores} from '../stores';
import {observer, useLocalStore} from 'mobx-react';
import {Upload, message, Spin, Button} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';

const {Dragger} = Upload;

const Result = styled.div`
  margin-top: 30px;
  border:1px dashed #ccc;
  padding: 20px;
`

const StyledA = styled.a`
  color: rgb(24,144,255);
`

const H1 = styled.h1`
  margin: 20px 0;
  text-align: center;
`

const Image = styled.img`
  max-width: 250px;
`

const StyledButton = styled(Button)`
  border-radius: 12px;
  margin-right: 6px;
  padding-left: 6px;
  padding-right: 6px;
`

const Component = observer(() => {
  const {ImageStore, UserStore} = useStores();
  const ref1 = useRef();
  const ref2 = useRef();

  const store = useLocalStore(()=> ({
    width: null,
    setWidth(width){
      store.width = width;
    },
    get widthStr() {
      return store.width ? `/w/${store.width}` : '';
    },

    height: null,
    setHeight(height){
      store.height = height;
    },
    get heightStr(){
      return store.height ? `/h/${store.height}` : '';
    },
    get fullStr() {
      //?imageView2/0/w/800/h/400
      return ImageStore.serverFile.attributes.url.attributes.url + '?imageView2/0' + store.widthStr + store.heightStr
    }
  }))

  const handleCopy= (value) =>{
    copy(value)
    message.info('链接复制成功')
  }

  const props = {
    showUploadList: false,
    beforeUpload: file => {
      ImageStore.setFile(file);
      ImageStore.setFilename(file.name);
      if(UserStore.currentUser === null) {
        message.warning('请先登录！');
        return false;
      }
      window.file = file;
      if(!/(svg$)|(png$)|(jpg$)|(jpeg$)|(git$)/ig.test(file.type)){
        message.error('只能上传 png/svg/jpg/git 格式的图片！')
        return false
      }
      if(file.size > 1024*1024) {
        message.error('图片大小不能超过 1M')
        return false
      }

      ImageStore.upload()
        .then((serverFile)=>{
          console.log('上传成功');
          console.log(serverFile);
        }).catch(()=>{
          console.log('上传失败');
        });
      return false;
    }
  }

  return (
    <div>
      <Spin tip="上传中" spinning={ImageStore.isUploading}>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或拖拽图片到此处进行上传</p>
        <p className="ant-upload-hint">
          仅支持 .png/.gif/.jpg/.svg 格式的图片，图片大小不能超过1M
        </p>
      </Dragger>
      </Spin>
      {
        ImageStore.serverFile ? <Result>
          <H1>阁下最近一次上传的图片</H1>
          <dl>
            <dt><h3><strong>线上地址</strong></h3></dt>
            <dd>
              <StyledButton type="primary">
                <a target="_blank" href={ ImageStore.serverFile.attributes.url.attributes.url }>查看原图</a>
              </StyledButton>
              <StyledButton type="primary" onClick={()=>handleCopy(ImageStore.serverFile.attributes.url.attributes.url)}>复制链接</StyledButton>
            </dd>
            <dt><h3><strong>文件名</strong></h3></dt>
            <dd>{ImageStore.filename}</dd>
            <dt><h3><strong>图片预览</strong></h3></dt>
            <dd>
              <Image src={ ImageStore.serverFile.attributes.url.attributes.url } alt=""/>
            </dd>
          </dl>
        </Result> : null
      }
    </div>
  )
})

export default Component;