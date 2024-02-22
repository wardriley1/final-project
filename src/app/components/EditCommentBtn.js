"use client";
import { useFormStatus } from "react-dom";

export default function EditCommentBtn() {
    const formStatus = useFormStatus();

    return (
        <button type="submit" className="review dark" disabled={formStatus.pending}>
            {formStatus.pending ? "Editing comment...": "Edit comment"}
        </button>
    );
    }