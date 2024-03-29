/* eslint-disable no-mixed-spaces-and-tabs */
import React from "react"

export default function Form({ methods, children, onSubmit }) {
	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
	} = methods

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="mb-20">
			{React.Children.map(children, (child) => {
				return child?.props?.name
					? React.createElement(child.type, {
							...{
								...child.props,
								register,
								errors,
								control,
								key: child.props.name,
							},
					  })
					: child
			})}
		</form>
	)
}
