import { useEffect, useState } from "react";
import { fetchUserReservationsHistory, deleteReservation, checkIn } from "../../api/reservations/api";
import type { GetUserReservationsHistoryDto } from "../../api/reservations/dto/get-reservations-history.dto";
import type { Reservation } from "../../api/reservations/dto/get-all-reservations.dto";
import { toast } from "react-hot-toast";

const PAGE_SIZE = 5;

function ReservationList({
  reservations,
  currentPage,
  onPageChange,
  onDeleteClick,
  onCheckInClick,
  activeTab,
}: {
  reservations: Reservation[];
  currentPage: number;
  onPageChange: (page: number) => void;
  onDeleteClick: (reservation: Reservation) => void;
  onCheckInClick?: (reservation: Reservation) => void;
  activeTab: "today" | "future" | "past";
}) {
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginated = reservations.slice(start, start + PAGE_SIZE);

  function formatDateWithDay(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div>
      {paginated.length === 0 ? (
        <p>Aucune réservation.</p>
      ) : (
        <ul className="space-y-2">
          {paginated.map((r) => (
            <li
              key={r.id}
              className="border p-3 rounded shadow flex justify-between items-center"
            >
              <div>
                <p><strong>Date:</strong> {formatDateWithDay(r.date)}</p>
                <p><strong>Place:</strong> {r.parkingSpot.label}</p>
                <p><strong>Check-in:</strong> {r.checkedIn ? "✔️" : "❌"}</p>
              </div>
              <div className="flex gap-2 items-center">
                {activeTab === "today" && onCheckInClick && (
                  <button
                    className={`px-3 py-1 rounded ${
                      r.checkedIn
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                    onClick={() => {
                      if (!r.checkedIn) {
                        onCheckInClick(r);
                      }
                    }}
                    disabled={r.checkedIn}
                  >
                    Check-in
                  </button>
                )}
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => {
                    if (confirm("Voulez-vous vraiment supprimer cette réservation ?")) {
                      onDeleteClick(r);
                    }
                  }}
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {reservations.length > PAGE_SIZE && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: Math.ceil(reservations.length / PAGE_SIZE) }).map((_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function UserReservations() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<GetUserReservationsHistoryDto | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<"today" | "future" | "past">("today");

  const [pageToday, setPageToday] = useState(1);
  const [pageFuture, setPageFuture] = useState(1);
  const [pagePast, setPagePast] = useState(1);

  const refreshData = () => {
    setLoading(true);
    fetchUserReservationsHistory()
      .then((res) => {
        setData(res);
        setError(null);
      })
      .catch(() => setError("Erreur lors du chargement"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleDelete = async (reservation: Reservation) => {
    try {
      await deleteReservation(reservation.id);
      toast.success("Réservation supprimée");
      refreshData();
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  const handleCheckIn = async (reservation: Reservation) => {
    try {
      await checkIn(reservation.id);
      toast.success("Check-in effectué");
      refreshData();
    } catch {
      toast.error("Erreur lors du check-in");
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  let reservations = [];
  let currentPage = 1;
  let setPage: (p: number) => void = () => {};

  switch (activeTab) {
    case "today":
      reservations = data?.today || [];
      currentPage = pageToday;
      setPage = setPageToday;
      break;
    case "future":
      reservations = data?.future || [];
      currentPage = pageFuture;
      setPage = setPageFuture;
      break;
    case "past":
      reservations = data?.past || [];
      currentPage = pagePast;
      setPage = setPagePast;
      break;
  }

  return (
    <div className="flex gap-6">
      <nav className="flex flex-col space-y-2 w-40">
        <button
          className={`py-2 px-4 rounded text-left ${
            activeTab === "past" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("past")}
        >
          Passées
        </button>
        <button
          className={`py-2 px-4 rounded text-left ${
            activeTab === "today" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("today")}
        >
          Aujourd'hui
        </button>
        <button
          className={`py-2 px-4 rounded text-left ${
            activeTab === "future" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("future")}
        >
          À venir
        </button>
      </nav>

      <section className="flex-1">
        <h2 className="text-2xl font-bold mb-4">
          {activeTab === "past" && "Réservations Passées"}
          {activeTab === "today" && "Réservations Aujourd'hui"}
          {activeTab === "future" && "Réservations à Venir"}
        </h2>

        <ReservationList
          reservations={reservations}
          currentPage={currentPage}
          onPageChange={setPage}
          onDeleteClick={handleDelete}
          onCheckInClick={handleCheckIn}
          activeTab={activeTab}
        />
      </section>
    </div>
  );
}
