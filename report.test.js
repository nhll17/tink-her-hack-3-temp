const firebase = require('firebase');
jest.mock('firebase');

test('submission does not update Firebase', () => {
    const updateMock = jest.fn();
    firebase.database = jest.fn(() => ({
        ref: jest.fn(() => ({
            update: updateMock
        }))
    }));

    // Simulate submission process here

    expect(updateMock).not.toHaveBeenCalled();
});