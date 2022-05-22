import { EditorProps } from 'draft-js';
import {
	ButtonHTMLAttributes,
	CSSProperties,
	InputHTMLAttributes,
} from 'react';
import { FieldError } from 'react-hook-form';

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface IFieldProps {
	placeholder: string;
	error?: FieldError | undefined;
}
type TInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps;
export interface IField extends TInputPropsField {}

type TypeEditorPropsField = EditorProps & IFieldProps;

export interface ITextEditor extends Omit<TypeEditorPropsField, 'editorState'> {
	onChange: (...event: any[]) => void;
	value: string;
}

export interface IUploadField {
	folder?: string;
	value?: string;
	placeholder: string;
	error?: FieldError;
	style?: CSSProperties;
	isNoImage?: boolean;
	onChange: (...event: any[]) => void;
}
