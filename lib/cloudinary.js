import cloudinary from 'cloudinary';

//las credenciales deberian ir con variables de ENtorno como Process.env.PORT
cloudinary.config({
    cloud_name:'df6jfxhox1',
    api_key:'862496574226365',
    api_secret:'30nVQY1DYLF3ylcs5DUzF0n7vrE'
})

module.exports = async (file) =>{

    try {
        const res = await cloudinary.uploader.upload(file);
        return res.secure_url; //se retorna la URL segura qudonde queda almacenado en Cloudinary
    } catch (error) {
            return error;
    }
}