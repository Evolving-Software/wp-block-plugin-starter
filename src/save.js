/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";
import React from "react";
import ReactDOM from "react-dom";
const { useState } = React;

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save() {
	// const [pmCount, setPmCount] = useState(0);

	return (
		<>
			<div className="flex  flex-col">
				<label htmlFor="myInput">Project Managers</label>
				<input type="text" id="myInput" value="PM" />
				<label htmlFor="myInput">Designers</label>
				<input type="text" id="myInput" value="PM" />
			</div>
		</>
	);
}
