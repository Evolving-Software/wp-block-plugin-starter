/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.css';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
// import deprecated from './deprecated';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit,
	/**
	 * @see ./save.js
	 */
	save,

	deprecated: [
		{
			attributes: {
				"title": "Pricing Calculator"
			},
			save: function (props) {
				return (
					<>
						<div className="flex bg-blue-600 flex-col">
							<label htmlFor="myInput">Project Managers</label>
							<input type="text" id="myInput" value="PM" />
							<label htmlFor="myInput">Designers</label>
							<input type="text" id="myInput" value="PM" />
						</div>
					</>
				);
			}
		}
	]
});
