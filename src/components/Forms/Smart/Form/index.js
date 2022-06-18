/* eslint-disable no-mixed-spaces-and-tabs */
import React from "react"

export default function Form({ methods, children, onSubmit }) {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = methods

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{React.Children.map(children, (child) => {
				return child.props.name
					? React.createElement(child.type, {
							...{
								...child.props,
								register,
								errors,
								key: child.props.name,
							},
					  })
					: child
			})}
		</form>
	)
}
