STEP 1. START
STEP 2. Display main page
STEP 3. Prompt user to upload a video
STEP 4. Accept the uploaded video
STEP 5. Verify if the video can be received
    IF video is acceptable
    THEN
        STEP 6. Encode the video using EfficientNet7 for faster processing
        STEP 7. Use deepfake detection model to analyze the video
        STEP 8. Determine if deepfakes are present
            IF deepfakes are detected
            THEN
                STEP 9. Inform the user that the video is likely a deepfake
            ELSE
                STEP 10. Inform the user that the video is likely authentic
    ELSE
        STEP 11. Inform the user that the video cannot be received
STEP 12. END