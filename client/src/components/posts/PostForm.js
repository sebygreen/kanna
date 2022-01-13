import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';

class PostForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			thumbnail: '',
			title: '',
			text: '',
			price: '',
			errors: {},
		};

		this.onFileChange = this.onFileChange.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	// set the new state of errors to perform form validation
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.errors !== prevState.errors) {
			return {
				errors: nextProps.errors,
			};
		}

		return null;
	}

	onSubmit(event) {
		event.preventDefault();

		const { user } = this.props.auth;

		const newPost = {
			thumbnail: this.state.thumbnail,
			title: this.state.title,
			text: this.state.text,
			price: this.state.price,
			name: user.name,
		};

		this.props.addPost(newPost);
		this.setState({
			thumbnail: '',
			title: '',
			text: '',
			price: '',
		});
	}

	// handle the image file
	onFileChange(event) {
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.onload = (data) => {
			this.setState({ thumbnail: data.target.result });
		};

		if (file) {
			reader.readAsDataURL(file);
		}
	}

	onChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	render() {
		const { errors } = this.state;

		return (
			<div>
				<form
					noValidate
					onSubmit={this.onSubmit}
					encType="multipart/form-data"
				>
					<legend
						className={
							'order-1 text-gray-900 text-3xl font-extrabold tracking-tight mt-4'
						}
					>
						New Product
					</legend>

					<div className={'grid grid-cols-6 gap-6 mt-2'}>
						<div className={'col-span-3'}>
							<div className={'grid grid-cols-3 gap-6'}>
								<div className={'col-span-2'}>
									<label
										htmlFor="title"
										className="block text-sm font-medium text-gray-700"
									>
										Title
									</label>
									<input
										type="text"
										name="title"
										id="title"
										className="mt-1 text-gray-900 ring-gray-900 ring-opacity-5 placeholder-gray-400 appearance-none bg-white rounded-md block w-full px-3 py-2 border border-transparent shadow ring-1 sm:text-sm mb-4 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
										placeholder={
											'e.g. Homegrown Lemon Haze'
										}
									/>
								</div>

								<div className={'col-span-1'}>
									<label
										htmlFor="first-name"
										className="block text-sm font-medium text-gray-700"
									>
										Price
									</label>
									<input
										type="text"
										name="first-name"
										id="first-name"
										autoComplete="given-name"
										className="mt-1 text-gray-900 ring-gray-900 ring-opacity-5 placeholder-gray-400 appearance-none bg-white rounded-md block w-full px-3 py-2 border border-transparent shadow ring-1 sm:text-sm mb-4 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
									/>
								</div>
							</div>

							{/* <div>
								<label
									htmlFor="title"
									className={
										'block text-sm font-medium text-gray-700'
									}
								>
									Title
								</label>

								<input
									onChange={this.onChange}
									value={this.state.title}
									name={'title'}
									id="title"
									type="text"
									className={`form-control ${
										errors.title ? 'is-invalid' : ''
									}`}
									placeholder={'e.g Homegrown Lemon Haze'}
								/>

								{errors.title && (
									<div className="invalid-feedback">
										{errors.title}
									</div>
								)}

								<div id="title-tip" className="form-text">
									Include information such as the strain, if
									this product is homemade, or if you are
									reselling a processed product
								</div>
							</div> */}

							<div>
								<label
									className={
										'block text-sm font-medium text-gray-700'
									}
								>
									Photo
								</label>
								<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
									<div className="space-y-1 text-center">
										<svg
											className="mx-auto h-12 w-12 text-gray-400"
											stroke="currentColor"
											fill="none"
											viewBox="0 0 48 48"
											aria-hidden="true"
										>
											<path
												d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
												strokeWidth={2}
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
										<div className="flex text-sm text-gray-600">
											<label
												htmlFor="file-upload"
												className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
											>
												<span>Upload a file</span>
												<input
													id="file-upload"
													name="file-upload"
													type="file"
													className="sr-only"
												/>
											</label>
											<p className="pl-1">
												or drag and drop
											</p>
										</div>
										<p className="text-xs text-gray-500">
											PNG, JPG, GIF up to 10MB
										</p>
									</div>
								</div>
							</div>

							{/* <label htmlFor="thumbnail" className="form-label">Photo</label>

                            <input
                                onChange={this.onFileChange}
                                name={'thumbnail'}
                                id="thumbnail"
                                type="file"
                                className={`form-control ${errors.thumbnail ? 'is-invalid' : ''}`}
                            />

                            {errors.thumbnail && <div className="invalid-feedback">{errors.thumbnail}</div>}

                            <div id="thumbnail-tip" className="form-text">
                                The photo must show your product clearly
                            </div> */}
						</div>

						{/* <div className="col">
							<label htmlFor="text" className="form-label">
								Description
							</label>

							<textarea
								placeholder={'Describe your offering...'}
								name={'text'}
								value={this.state.text}
								onChange={this.onChange}
								className={'form-control align-self-stretch'}
								style={{
									resize: 'none',
									height: 'calc(100% - 32px)',
								}}
							/>

							{errors.text && (
								<div className="invalid-feedback">
									{errors.text}
								</div>
							)}
						</div> */}

						<div className={'col-span-3'}>
							<div className={'flex flex-col h-full'}>
								<label
									htmlFor="about"
									className="block text-sm font-medium text-gray-700"
								>
									Description
								</label>
								<textarea
									id="about"
									name="about"
									className="resize-none box-border h-full mt-1 text-gray-900 ring-gray-900 ring-opacity-5 placeholder-gray-400 appearance-none bg-white rounded-md block w-full px-3 py-2 border border-transparent shadow ring-1 sm:text-sm mb-1 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
									placeholder="e.g. Best weed on the market!"
									defaultValue={''}
								/>
								<p className="text-sm text-gray-500 mb-4">
									Brief description of your product.
								</p>

								<div>
									<button
										type="submit"
										className={
											'float-right flex justify-center items-center py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75'
										}
									>
										Publish
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5 ml-2 opacity-60"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
											/>
										</svg>
									</button>
								</div>
							</div>

							{/* <label htmlFor="price" className="form-label">
								Price
							</label>

							<div className={'d-flex align-items-center'}>
								<input
									onChange={this.onChange}
									value={this.state.price}
									name={'price'}
									id="price"
									type="number"
									className={`form-control ${
										errors.price ? 'is-invalid' : ''
									}`}
								/>
								<p
									className={'ms-2'}
									style={{ marginBottom: '3px' }}
								>
									$/g
								</p>
							</div>

							{errors.price && (
								<div className="invalid-feedback">
									{errors.price}
								</div>
							)} */}
						</div>
					</div>
				</form>
			</div>
		);
	}
}

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, { addPost })(PostForm);
