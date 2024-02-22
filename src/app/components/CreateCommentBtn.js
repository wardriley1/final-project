"use client";
import { useFormStatus } from "react-dom";

export default function CreateCommentBtn() {
    const formStatus = useFormStatus();

    return (
        <button type="submit" className="review dark" disabled={formStatus.pending}>
            {formStatus.pending ? "Creating comment...": "Create comment"}
        </button>
    );
}