# Menggunakan Node.js versi terbaru (minimal 20)
FROM node:22

# Set working directory dalam container
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file ke dalam container
COPY . .

# Ekspos port backend
EXPOSE 5000

# Jalankan backend saat container dimulai
CMD ["node", "server.js"]
