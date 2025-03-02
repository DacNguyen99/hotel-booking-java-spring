import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const totalDays = checkOutDate.diff(checkInDate, "days");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const navigate = useNavigate();

  const handleConfirmBooking = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsBookingConfirmed(true);
      onConfirm();
    }, 3000);
  };

  useEffect(() => {
    if (isBookingConfirmed) {
      navigate("/booking-success");
    }
  }, [isBookingConfirmed, navigate]);

  return (
    <div className="row">
      <div className="card card-body mt-5">
        <h4 className="card-title hotel-color">Reservation Summary</h4>

        <p>
          Full name: <strong>{booking.guestFullName}</strong>
        </p>
        <p>
          Email: <strong>{booking.guestEmail}</strong>
        </p>
        <p>
          Check-in date:{" "}
          <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong>
        </p>
        <p>
          Check-out date:{" "}
          <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong>
        </p>
        <p>
          Number of days: <strong>{totalDays}</strong>
        </p>
        <div>
          <h5 className="hotel-color">Number of guests</h5>
          <div>
            <strong>
              Adult{booking.numOfAdults > 1 ? "s" : ""}: {booking.numOfAdults}
            </strong>
          </div>
          <div>
            <strong>Children: {booking.numOfChildren}</strong>
          </div>
        </div>

        {payment > 0 ? (
          <>
            <p>
              Total Payment: <strong>${payment}</strong>
            </p>

            {isFormValid && !isBookingConfirmed ? (
              <Button variant="success" onClick={handleConfirmBooking}>
                {isProcessingPayment ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm mr-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Booking confirmed, redirecting to payment...
                  </>
                ) : (
                  "Confirm Booking and proceed to payment!"
                )}
              </Button>
            ) : isBookingConfirmed ? (
              <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading</span>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <p className="text-danger">
            Check-out date must be later than check-in date. Please adjust your
            dates.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingSummary;
