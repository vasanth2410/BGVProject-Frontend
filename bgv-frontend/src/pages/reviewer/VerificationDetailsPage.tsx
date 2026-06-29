import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    Paper,
    Typography,
    CircularProgress,
} from "@mui/material";

import {
    getVerificationById,
} from "../../services/ReviewerService";

import type {
    Verification,
} from "../../types/Verification";

export default function VerificationDetailsPage() {

    const { id } = useParams();

    const [verification, setVerification] =
        useState<Verification | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const loadVerification =
        async () => {

            if (!id)
                return;

            try {

                const result =
                    await getVerificationById(Number(id));

                setVerification(result);

            }
            finally {

                setLoading(false);

            }

        };

        void loadVerification();

    }, [id]);

    if (loading)
        return <CircularProgress />;

    if (!verification)
        return (
            <Typography>
                Verification not found
            </Typography>
        );

    return (

        <Paper sx={{ p:4 }}>

            <Typography variant="h4">
                Verification Details
            </Typography>

            <Typography sx={{ mt:3 }}>
                Verification Id :
                {verification.id}
            </Typography>

            <Typography>
                Candidate Id :
                {verification.candidateId}
            </Typography>

            <Typography>
                Verification Type :
                {verification.verificationType}
            </Typography>

            <Typography>
                Status :
                {verification.status}
            </Typography>

            <Typography>
                Remarks :
                {verification.reviewerRemarks}
            </Typography>

        </Paper>

    );

}