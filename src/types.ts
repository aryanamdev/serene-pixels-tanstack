export interface Post {
    id:                       string;
    slug:                     string;
    alternative_slugs:        AlternativeSlugs;
    created_at:               string;
    updated_at:               string;
    promoted_at:              null;
    width:                    number;
    height:                   number;
    color:                    string;
    blur_hash:                string;
    description:              null;
    alt_description:          string;
    breadcrumbs:              unknown[];
    urls:                     Urls;
    links:                    PostLinks;
    likes:                    number;
    liked_by_user:            boolean;
    bookmarked:               boolean;
    current_user_collections: unknown[];
    sponsorship:              Sponsorship;
    topic_submissions:        TopicSubmissions;
    asset_type:               string;
    user:                     User;
}

export interface AlternativeSlugs {
    en: string;
    es: string;
    ja: string;
    fr: string;
    it: string;
    ko: string;
    de: string;
    pt: string;
    id: string;
}

export interface PostLinks {
    self:              string;
    html:              string;
    download:          string;
    download_location: string;
}

export interface Sponsorship {
    impression_urls: unknown[];
    tagline:         string;
    tagline_url:     string;
    sponsor:         User;
}

export interface User {
    id:                           string;
    updated_at:                   string;
    username:                     string;
    name:                         string;
    first_name:                   string;
    last_name:                    null;
    twitter_username:             null;
    portfolio_url:                string;
    bio:                          string;
    location:                     null;
    links:                        UserLinks;
    profile_image:                ProfileImage;
    instagram_username:           string;
    total_collections:            number;
    total_likes:                  number;
    total_photos:                 number;
    total_free_photos:            number;
    total_promoted_photos:        number;
    total_illustrations:          number;
    total_free_illustrations:     number;
    total_promoted_illustrations: number;
    accepted_tos:                 boolean;
    for_hire:                     boolean;
    social:                       Social;
}

export interface UserLinks {
    self:      string;
    html:      string;
    photos:    string;
    likes:     string;
    portfolio: string;
}

export interface ProfileImage {
    small:  string;
    medium: string;
    large:  string;
}

export interface Social {
    instagram_username: string;
    portfolio_url:      string;
    twitter_username:   null;
    paypal_email:       null;
}

export type TopicSubmissions = Record<string, string>

export interface Urls {
    raw:      string;
    full:     string;
    regular:  string;
    small:    string;
    thumb:    string;
    small_s3: string;
}
