import {observable, action, makeObservable} from 'mobx';
import {Auth, Uploader} from '../models';

class ImageStore {
  // 状态
  @observable filename = "";
  @observable file = null;
  @observable isUploading = false;
  @observable serverFile = null;

  @action setFilename(newFilename){
    this.filename = newFilename;
  }

  @action setFile(newFile){
    this.file = newFile;
  }

  @action upload(){
    this.isUploading = true;
    return new Promise((resolve, reject) => {
      Uploader.add(this.file, this.filename
        .then(serverFile => {
          this.serverFile = serverFile;
          resolve(serverFile);
        }).catch(err => {
          console.error('上传失败')
        }).finally(()=>{
          this.isUploading = false;
        }))
    })
  }
}

export default new ImageStore();