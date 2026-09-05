import { defineBook } from "@sleetch/react"

export const { Component: Book } = defineBook({
	button: () => import("./stories/button"),
	file: () => import("./stories/file"),
});

export default Book
