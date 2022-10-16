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


	return (
		<>
			<div {...useBlockProps.save()}>
				<div className="text-lg text-green-500">This is a template for creating a WordPress Block Plugin.</div>
			</div>
		</>
	);
}
