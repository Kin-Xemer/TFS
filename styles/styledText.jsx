import * as React from 'react';
import {Text, StyleSheet} from 'react-native';

/* ở font open sans chỉ có 5 styles, còn mặc định của react-native có 9 styles 
và kèm 2 styles mặc định ở đây chúng ta custom lại sao cho khớp với react-native */
const QuickSandFont = {
  normal: 'Regular',
  bold: 'Bold',
  '100': 'Light',
  '200': 'Light',
  '300': 'Light',
  '400': 'Regular',
  '500': 'Medium',
  '600': 'SemiBold',
  '700': 'SemiBold',
  '800': 'Bold',
  '900': 'Bold',
};

/* chuyển fontWeight và fontStyle lại ban đầu
bởi vì chúng ta sử dụng fontFamily có kèm 2 thằng này rồi */
const disableStyles = {
  fontStyle: 'Regular',
  fontWeight: 'Regular',
};

export function QuickSandText(props) {
  /* ở đây mình lấy giá trị fontWeight với fontStyle ra */
  const {fontWeight = '400', fontStyle} = StyleSheet.flatten(props.style || {});

  /* bây giờ mình thêm fontFamily vào với cú pháp font mình đã định trước 
  cú pháp: tên font _ độ đậm _ italic (nếu có) */
  const fontFamily = `Quicksand-${QuickSandFont[fontWeight]}${
    fontStyle === 'italic' ? '_italic' : ''
  }`;

  return <Text {...props} style={[props.style, {fontFamily}, disableStyles]} />;
}