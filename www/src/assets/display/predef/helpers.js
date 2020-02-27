export default function newPositionFromRelative(currentPosition, relativePosition) {
    return {
        x: currentPosition.x + relativePosition.x,
        y: currentPosition.y + relativePosition.y
    };
}