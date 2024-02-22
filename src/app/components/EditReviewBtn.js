"use client";
import { useFormStatus } from "react-dom";

export default function EditReviewBtn() {
    const formStatus = useFormStatus();

    return (
        <button type="submit" className="review dark" disabled={formStatus.pending}>
            {formStatus.pending ? "Editing review...": "Edit review"}
        </button>
    );
}