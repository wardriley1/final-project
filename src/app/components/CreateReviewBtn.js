"use client";
import { useFormStatus } from "react-dom";

export default function CreateReviewBtn() {
    const formStatus = useFormStatus();

    return (
        <button type="submit" disabled={formStatus.pending}>
            {formStatus.pending ? "Creating review...": "Create review"}
        </button>
    );
}