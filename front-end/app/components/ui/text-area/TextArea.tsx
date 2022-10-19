import React, { forwardRef } from 'react'
import { ITextArea } from '@/components/ui/text-area/textArea.interface'
import styles from './TeaxtArea.module.scss'

const TextArea = forwardRef<HTMLTextAreaElement, ITextArea>(
	({ error, style, ...rest }, ref) => {
		return (
			<div className={styles.editor} style={style}>
				<textarea ref={ref} {...rest} />
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)

TextArea.displayName = 'TextArea'

export default TextArea
