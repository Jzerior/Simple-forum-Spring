#!/usr/bin/env bash
# wait-for-it.sh

# Zmienna do ustawienia limitu czasowego
TIMEOUT=30
# Zmienna do ustawienia przerwy między próbami
WAIT_INTERVAL=2

# Funkcja do sprawdzania dostępności hosta
wait_for_host() {
    local host=$1
    local port=$2
    local timeout=$3
    local interval=$4
    local start_time=$(date +%s)

    echo "Czekam na hosta $host:$port..."

    # Pętla do oczekiwania na połączenie
    while true; do
        nc -z $host $port > /dev/null 2>&1
        if [ $? -eq 0 ]; then
            echo "Połączenie z $host:$port udane!"
            break
        fi

        # Obliczanie upływającego czasu
        current_time=$(date +%s)
        elapsed=$((current_time - start_time))

        # Sprawdzanie, czy upłynął czas oczekiwania
        if [ $elapsed -ge $timeout ]; then
            echo "Nie udało się połączyć z $host:$port w czasie $timeout sekund!"
            exit 1
        fi

        # Czekaj przez określony interwał, a następnie ponów próbę
        sleep $interval
    done
}

# Główna funkcja
if [ "$#" -lt 2 ]; then
    echo "Użycie: $0 host port [timeout [interval]]"
    exit 1
fi

# Przypisz argumenty
HOST=$1
PORT=$2

# Jeśli podano limit czasowy i interwał, użyj ich
if [ ! -z "$3" ]; then
    TIMEOUT=$3
fi
if [ ! -z "$4" ]; then
    WAIT_INTERVAL=$4
fi

# Wywołaj funkcję oczekiwania na hosta
wait_for_host $HOST $PORT $TIMEOUT $WAIT_INTERVAL
