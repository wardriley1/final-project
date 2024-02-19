"use client";
import { useFormStatus } from "react-dom";

export default function EditReviewBtn() {
    const formStatus = useFormStatus();

    return (
        <button type="submit" disabled={formStatus.pending}>
            {formStatus.pending ? "Editing review...": "Edit review"}
        </button>
    );
}