import { TextInputProps } from 'react-native';

interface IInputComponentProps extends TextInputProps {
    icon:string;
    onPress?:()=>void;
}

export { IInputComponentProps };