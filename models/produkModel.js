// Model produk: definisi tabel "produk" dan semua operasi data (query) ada di sini.
// Controller hanya memanggil fungsi di bawah, tanpa menulis query sendiri.
const { DataTypes, Op } = require('sequelize');
const sequelize = require('../config/database');

const Produk = sequelize.define(
  'Produk',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nama: {
      type: DataTypes.STRING(120),
      allowNull: false,
      validate: {
        notNull: { msg: 'Nama produk wajib diisi' },
        notEmpty: { msg: 'Nama produk wajib diisi' },
        len: { args: [1, 120], msg: 'Nama produk maksimal 120 karakter' },
      },
    },
    asal: {
      type: DataTypes.STRING(80),
      allowNull: true,
      validate: { len: { args: [0, 80], msg: 'Asal maksimal 80 karakter' } },
    },
    roast: {
      type: DataTypes.STRING(30),
      allowNull: true,
      validate: { len: { args: [0, 30], msg: 'Roast maksimal 30 karakter' } },
    },
    notes: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false, defaultValue: [] },
    harga: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Harga wajib diisi' },
        isInt: { msg: 'Harga harus berupa angka bulat' },
        min: { args: [0], msg: 'Harga tidak boleh negatif' },
      },
    },
    berat: {
      type: DataTypes.STRING(30),
      allowNull: true,
      validate: { len: { args: [0, 30], msg: 'Berat maksimal 30 karakter' } },
    },
    stok: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: { msg: 'Stok harus berupa angka bulat' },
        min: { args: [0], msg: 'Stok tidak boleh negatif' },
      },
    },
    // Foto kemasan (opsional). Jika kosong, tampilan memakai ilustrasi bawaan.
    gambar: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        len: { args: [0, 255], msg: 'URL gambar maksimal 255 karakter' },
        urlAtauPath(nilai) {
          if (nilai && !/^(https?:\/\/|\/)/i.test(nilai)) {
            throw new Error('Gambar harus berupa URL (http/https) atau path yang diawali /');
          }
        },
      },
    },

    // Field turunan (tidak disimpan di database, dihitung saat dibaca).
    tersedia: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue('stok') > 0;
      },
    },
  },
  { tableName: 'produk', timestamps: true }
);

// Ubah instance Sequelize menjadi objek biasa (termasuk field turunan).
const plain = (row) => (row ? row.get({ plain: true }) : null);

const ProdukModel = {
  async getAll() {
    const rows = await Produk.findAll({ order: [['id', 'ASC']] });
    return rows.map(plain);
  },

  async getById(id) {
    return plain(await Produk.findByPk(id));
  },

  countAll() {
    return Produk.count();
  },

  countTersedia() {
    return Produk.count({ where: { stok: { [Op.gt]: 0 } } });
  },

  async create(data) {
    return plain(await Produk.create(data));
  },

  // Mengembalikan null jika id tidak ditemukan.
  async update(id, data) {
    const row = await Produk.findByPk(id);
    if (!row) return null;
    await row.update(data);
    return plain(row);
  },

  // Mengembalikan data yang dihapus, atau null jika id tidak ditemukan.
  async remove(id) {
    const row = await Produk.findByPk(id);
    if (!row) return null;
    const dihapus = plain(row);
    await row.destroy();
    return dihapus;
  },

  bulkCreate(daftar) {
    return Produk.bulkCreate(daftar);
  },
};

module.exports = ProdukModel;