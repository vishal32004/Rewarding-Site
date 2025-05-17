interface SignUpUser {
    status: number;
    name: string;
    email: string;
    mobile: string;
    company_name: string;
    number_of_employee: string;
    created_at: string;
    updated_at: string;
    id: number;
}

export interface SignUpResponse {
    status: number;
    error: null | string;
    message: string;
    User?: SignUpUser;
}

type UserPermissions = {
    "debugbar.openhandler": boolean;
    "debugbar.clockwork": boolean;
    "debugbar.assets.css": boolean;
    "debugbar.assets.js": boolean;
    "debugbar.cache.delete": boolean;
    "debugbar.queries.explain": boolean;
    "bone.captcha.image": boolean;
    "bone.captcha.image.tag": boolean;
    "cookies.toggle": boolean;
    "sanctum.csrf-cookie": boolean;
    "livewire.upload-file": boolean;
    "livewire.preview-file": boolean;
    "unisharp.lfm.show": boolean;
    "unisharp.lfm.getErrors": boolean;
    "unisharp.lfm.upload": boolean;
    "unisharp.lfm.getItems": boolean;
    "unisharp.lfm.getAddfolder": boolean;
    "unisharp.lfm.getFolders": boolean;
    "unisharp.lfm.getCrop": boolean;
    "unisharp.lfm.getRename": boolean;
    "unisharp.lfm.getResize": boolean;
    "unisharp.lfm.performResize": boolean;
    "unisharp.lfm.getDownload": boolean;
    "unisharp.lfm.getDelete": boolean;
    "unisharp.lfm.": boolean;
    "User.AddUser": boolean;
    "User.EditUser": boolean;
    "User.ListView": boolean;
    "User.Activate": boolean;
    "User.Deactivate": boolean;
    "User.Destroy": boolean;
    "User.Permissions": boolean;
    "User.importExport": boolean;
    "Role.AddRole": boolean;
    "Role.EditRole": boolean;
    "Role.ListView": boolean;
    "Role.Permission": boolean;
    "Customer.AddCustomer": boolean;
    "Customer.EditCustomer": boolean;
    "Customer.ListView": boolean;
    "Customer.Activate": boolean;
    "Customer.Deactivate": boolean;
    "Customer.Destroy": boolean;
    "Customer.ExportToExcel": boolean;
    "Client.AddClient": boolean;
    "Client.EditClient": boolean;
    "Client.ListView": boolean;
    "Client.Activate": boolean;
    "Client.Deactivate": boolean;
    "Client.Destroy": boolean;
    "Menu.AddMenu": boolean;
    "Menu.EditMenu": boolean;
    "Menu.ListView": boolean;
    "Menu.Activate": boolean;
    "Menu.Deactivate": boolean;
    "Menu.Destroy": boolean;
    "Article.AddArticle": boolean;
    "Article.EditArticle": boolean;
    "Article.ListView": boolean;
    "Article.Activate": boolean;
    "Article.Deactivate": boolean;
    "Article.Destroy": boolean;
    "Article.CategoryListView": boolean;
    "Article.AddArticleCategory": boolean;
    "Article.EditArticleCategory": boolean;
    "Article.CategoryDestroy": boolean;
    "Banner.AddBanner": boolean;
    "Banner.EditBanner": boolean;
    "Banner.ListView": boolean;
    "Banner.Activate": boolean;
    "Banner.Deactivate": boolean;
    "Banner.Destroy": boolean;
    "Brand.AddBrand": boolean;
    "Brand.EditBrand": boolean;
    "Brand.ListView": boolean;
    "Brand.Activate": boolean;
    "Brand.Deactivate": boolean;
    "Brand.Destroy": boolean;
    "Category.AddCategory": boolean;
    "Category.EditCategory": boolean;
    "Category.ListView": boolean;
    "Category.Activate": boolean;
    "Category.Deactivate": boolean;
    "Category.Destroy": boolean;
    "BlogCategory.AddBlogCategory": boolean;
    "BlogCategory.EditBlogCategory": boolean;
    "BlogCategory.ListView": boolean;
    "BlogCategory.Activate": boolean;
    "BlogCategory.Deactivate": boolean;
    "BlogCategory.Destroy": boolean;
    "Product.AddProduct": boolean;
    "Product.EditProduct": boolean;
    "Product.ListView": boolean;
    "Product.Activate": boolean;
    "Product.Deactivate": boolean;
    "Product.Destroy": boolean;
    "Product.ImageDestroy": boolean;
    "Specification.AddSpecification": boolean;
    "Specification.EditSpecification": boolean;
    "Specification.ListView": boolean;
    "Specification.Activate": boolean;
    "Specification.Deactivate": boolean;
    "Specification.Destroy": boolean;
    "Price.AddPrice": boolean;
    "Price.EditPrice": boolean;
    "Price.ListView": boolean;
    "Price.Activate": boolean;
    "Price.Deactivate": boolean;
    "Price.Destroy": boolean;
    "Tag.AddTag": boolean;
    "Tag.EditTag": boolean;
    "Tag.ListView": boolean;
    "Tag.Activate": boolean;
    "Tag.Deactivate": boolean;
    "Tag.Destroy": boolean;
    "Post.AddPost": boolean;
    "Post.EditPost": boolean;
    "Post.ListView": boolean;
    "Post.Activate": boolean;
    "Post.Deactivate": boolean;
    "Post.Destroy": boolean;
    "Payment.ListView": boolean;
    "Order.ListView": boolean;
    "OrderDetail.ListView": boolean;
    "Coupons.AddCoupons": boolean;
    "Coupons.EditCoupons": boolean;
    "Coupons.ListView": boolean;
    "Coupons.Activate": boolean;
    "Coupons.Deactivate": boolean;
    "Coupons.Destroy": boolean;
    "Testimonial.AddTestimonial": boolean;
    "Testimonial.EditTestimonial": boolean;
    "Testimonial.ListView": boolean;
    "Testimonial.Activate": boolean;
    "Testimonial.Deactivate": boolean;
    "Testimonial.Destroy": boolean;
    "storage.local": boolean;
};

export type LoginUser = {
    id: number;
    email: string;
    permissions: UserPermissions;
    last_login: string;
    first_name: string;
    last_name: string;
    location: string;
    created_at: string;
    updated_at: string;
    status: number;
};

export type LoginResponse = {
    status: number;
    error: null | string;
    User?: LoginUser;
    message: string;
};

export type ChangePasswordResponse = {
    status: number;
    error: null | string;
    data?: LoginUser
}

export type ProfileUpdateResponse = {
    status: number;
    error: string | null;
    message: string
}


interface UserRegisterData {
    id: number;
    user_id: number;
    business_id: number;
    social_id: string | null;
    avatar: string | null;
    user_type: string;
    first_name: string;
    last_name: string;
    email: string;
    Mobile: string;
    Address: string;
    City: string;
    State: string;
    Country: string;
    PinCode: string;
    Landmark: string;
    Shipping_Address: string;
    Shipping_City: string;
    Shipping_State: string;
    Shipping_Country: string;
    Shipping_Landmark: string;
    Shipping_PinCode: string;
    Gender: string;
    Day: string;
    Month: string;
    Year: string;
    term: string;
    v_email: string;
    status: number;
    created_at: string;
    updated_at: string;
}

export interface UserDetailsResponse {
    status: number;
    error: string | null;
    Userdata?: LoginUser;
    Registerdata?: UserRegisterData;
    message: string;
}
