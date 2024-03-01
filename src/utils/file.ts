// import Compressor from 'compressorjs';

/** base64转换为blob */
export const dataURLtoBlob = (dataurl: string) => {
    const arr: any[] = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
};
/** base64转换为file */
export const dataURLtoFile = (dataurl: string, filename: string) => {
    const arr: any[] = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};

/** blob转base64 */
export const filetoBase64 = (blob: Blob | File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

/**
   * 图片压缩
   * @param {File} image 图片
   * @param {String} backType 需要返回的类型blob、file
   * @param {Number} quality 图片压缩比，数字越小，图片压缩越小
   * @return
   */
// export const compressorImage = (image: File, maxWidth = 1000, maxHeight = 1000, quality = 0.9, backType = 'file'): Promise<Blob | File> => {
//     return new Promise((resolve, reject) => {
//         // eslint-disable-next-line no-new
//         new Compressor(image, {
//             quality: quality,
//             maxWidth, // 最大宽度，单位像素，默认为 undefined
//             maxHeight, // 最大高度，单位像素，默认为 undefined
//             success(result) {
//                 const file = new File([result], image.name, { type: image.type });
//                 if (!backType || backType === 'blob') {
//                     resolve(result);
//                 } else if (backType === 'file') {
//                     resolve(file);
//                 } else {
//                     resolve(file);
//                 }
//             },
//             error(err) {
//                 reject(err);
//             }
//         });
//     });
// };