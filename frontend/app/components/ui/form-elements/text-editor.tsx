import cn from 'classnames';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { FC, useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { ITextEditor } from './form.interface';
import s from './form.module.scss';

const TextEditor: FC<ITextEditor> = ({
	onChange,
	value,
	placeholder,
	error,
}) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [isUpdated, setIsUpdated] = useState<boolean>(false);

	useEffect(() => {
		if (isUpdated) return;

		const defaultValue = value || '';
		const blocksFromHTML = htmlToDraft(defaultValue);
		const contentState = ContentState.createFromBlockArray(
			blocksFromHTML.contentBlocks,
			blocksFromHTML.entityMap
		);

		const newEditorState = EditorState.createWithContent(contentState);
		setEditorState(newEditorState);
	}, [isUpdated, value]);

	const onEditorStateChange = (editorState: EditorState) => {
		setIsUpdated(true);
		setEditorState(editorState);

		return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
	};

	return (
		<div className={cn(s.common, s.editorWrapper, 'animate-fade')}>
			<label>
				<span>{placeholder}</span>
				<div className={s.wrapper}>
					<Editor
						toolbarClassName={s.toolbar}
						editorClassName={s.editor}
						editorState={editorState}
						onEditorStateChange={onEditorStateChange}
						spellCheck
						toolbar={{
							options: ['inline', 'blockType', 'list'],
							inline: {
								inDropdown: false,
								className: undefined,
								component: undefined,
								dropdownClassName: undefined,
								options: ['bold', 'italic', 'underline', 'strikethrough'],
							},
							blockType: {
								inDropdown: false,
								options: [],
							},
							list: {
								inDrodown: false,
								options: ['unordered', 'ordered'],
							},
						}}
					/>
				</div>
				{error && <div className={s.error}>{error.message}</div>}
			</label>
		</div>
	);
};

export default TextEditor;
