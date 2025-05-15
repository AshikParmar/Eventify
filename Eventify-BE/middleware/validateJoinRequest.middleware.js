import Event from '../models/event.js';

export const validateJoinRequest = async (req, res, next) => {
  try {
    const { eventId, numberOfTickets = 1 } = req.body;
    const user = req.user;

    if (!eventId ) {
      return res.status(400).json({ success: false, message: 'Event ID is required' });
    }

    if (!eventId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: 'Invalid Event ID format' });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const alreadyJoined = event.participants.includes(user.id);

    if (alreadyJoined) {
      return res.status(400).json({ success: false, message: 'User already joined this event' });
    }

    if (event.availableSlots < numberOfTickets) {
      return res.status(400).json({ success: false, message: 'Not enough available slots' });
    }

    // Pass event and user data to next middleware if needed
    req._validatedEvent = event;
    req._validatedUser = user;

    next();
  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({ success: false, message: 'Server error during join validation' });
  }
};
