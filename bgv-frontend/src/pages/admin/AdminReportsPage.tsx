import {
    Box,
    Button,
    Paper,
    Typography,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";

import { exportCandidatesReport }
from "../../services/ReportService";

export default function AdminReportsPage() {

    return (

        <Paper
            sx={{
                p: 4,
                borderRadius: 3,
            }}
        >

            <Typography
    variant="h4"
    sx={{
        fontWeight: 700,
        mb: 3,
    }}
>
    Reports
</Typography>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    p: 3,
                }}
            >

                <Box>

                    <Typography
                        variant="h6"
                    >

                        Candidates Report

                    </Typography>

                    <Typography
                        color="text.secondary"
                    >

                        Download complete candidate list as Excel.

                    </Typography>

                </Box>

                <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                   onClick={async () => {
    await exportCandidatesReport();
}}
                >

                    Export Excel

                </Button>

            </Box>

        </Paper>

    );

}