interface IHeaderProps {
    inputValue?:string;
    onPress?:()=>Promise;
    onChangeText:(string)=>void;
}

export { IHeaderProps };
